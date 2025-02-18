import { ErrorCode } from "../../common/enums/error-code.enum";
import redis from "../../common/service/redis.service";
import { compareValue, hashValue } from "../../common/utils/bcrypt";
import { BadRequestException, InternalServerException, NotFoundException, UnauthorizedException } from "../../common/utils/catch-errors";
import { anHourFromNow } from "../../common/utils/date-time";
import { generateUniqueCode } from "../../common/utils/uuid";
import { db } from "../../database/drizzle";
import { ha_availability, ha_details, login, users } from "../../database/schema/schema";
import { eq, gt, and } from "drizzle-orm";
import { sendEmail } from "../../mailer/mailer";
import { passwordResetTemplate } from "../../mailer/template/template";
import { config } from "../../config/app.config";

export class HaService{
    public async forgotPassword(email: string, secretWord: string) {
    const userResult = await db.select().from(login).where(eq(login.email, email)).limit(1);
    if (userResult.length === 0) {
        throw new NotFoundException(
            "User not found.",
            ErrorCode.AUTH_USER_NOT_FOUND
        );
    }
    const user = userResult[0];
    if (user.role !== "HA") {
        throw new BadRequestException(
            "Password reset via this flow is only for HA users.",
            ErrorCode.ACCESS_FORBIDDEN
        );
    }
    const haResult = await db
        .select()
        .from(ha_details)
        .where(eq(ha_details.ha_id, user.user_id))
        .limit(1);
    if (haResult.length === 0) {
        throw new NotFoundException(
            "HA details not found.",
            ErrorCode.AUTH_USER_NOT_FOUND
        );
    }
    const haRecord = haResult[0];

    const isSecretValid = await compareValue(secretWord, haRecord.secret_key);
    if (!isSecretValid) {
        throw new UnauthorizedException(
            "Invalid secret word.",
            ErrorCode.SECRET_WRONG
        );
    }
    const userId = haResult[0].ha_id

    const rateLimitKey = `password-reset:rate-limit:${userId}`;
    const requestCount = await redis.incr(rateLimitKey); 
    if (requestCount === 1) {
        await redis.expire(rateLimitKey, 180); 
    } else if (requestCount > 2) {
        throw new BadRequestException(
            "Too many requests, try again later",
            ErrorCode.AUTH_TOO_MANY_ATTEMPTS
        );
    }
    const otpTTL = 240;
    const expiresAt = new Date(Date.now() + otpTTL * 1000)
    const resetCode = generateUniqueCode();
    const redisKey = `password-reset:code:${resetCode}`;
    await redis.set(redisKey, userId, { ex: 240 }); 

      const resetLink = `${config.APP_ORIGIN}/reset-password?code=${resetCode}&exp=${expiresAt.getTime()}`;
      const { data, error } = await sendEmail({
          to: email,
          ...passwordResetTemplate(resetLink)
      });
      if (!data) {
          throw new InternalServerException(`${error?.name} - ${error?.message}`);
      }
      return {
          url: resetLink,
          emailId: data.response
      };
    }
    public async changeSecretWord(userId: string, currentSecret: string, newSecret: string) {
        const userResult = await db.select().from(ha_details).where(eq(ha_details.ha_id, userId));

        if (userResult.length === 0) {
            throw new NotFoundException(
                "User not found.", 
                ErrorCode.AUTH_NOT_FOUND
            );
        }

        const user = userResult[0];

        const isSecretValid = await compareValue(currentSecret, user.secret_key);
        if (!isSecretValid) {
            throw new BadRequestException(
                "Current secret is incorrect.",
                ErrorCode.SECRET_WRONG
            );
        }

        const hashedNewSecret = await hashValue(newSecret);

        await db.update(ha_details)
            .set({ secret_key: hashedNewSecret })
            .where(eq(ha_details.ha_id, userId));

        return;
    }
    public async toggleAvailability(userId: string) {
        const [haRecord] = await db.select().from(ha_details).where(eq(ha_details.ha_id, userId));

        if (!haRecord) {
            throw new NotFoundException("HA details not found", ErrorCode.AUTH_NOT_FOUND);
        }
        try {
            const newStatus = !haRecord.is_available;

            await db
                .update(ha_details)
                .set({ is_available: newStatus })
                .where(eq(ha_details.ha_id, userId));

            await redis.set("ha:available", JSON.stringify({ is_available: newStatus }));

        return newStatus;
        } catch (error) {
            throw  new InternalServerException(
                "Failed to Toggle status",
                ErrorCode.INTERNAL_SERVER_ERROR
            )
        }
    }
    public async setLeave(userId: string, start_date: Date, end_date: Date, reason: string) {
        const haRecord = await db.select().from(ha_details).where(eq(ha_details.ha_id, userId)).limit(1);

        if (!haRecord.length) {
            throw new NotFoundException("HA details not found.", ErrorCode.AUTH_USER_NOT_FOUND);
        }
        end_date.setHours(23, 59, 59, 999);
        const [leaveEntry] = await db.insert(ha_availability).values({
            ha_id: userId,
            start_date,
            end_date,
            reason
        }).returning();

        const redisKey = `ha:leave:${userId}`;
        const leaveData = {
            start_date,
            end_date,
            reason
        };

        const expireSeconds = Math.floor((end_date.getTime() - Date.now()) / 1000); 

        await redis.set(redisKey, JSON.stringify(leaveData), { ex: expireSeconds });

        return leaveEntry;
    }
     public async cancelLeave(userId: string) {
        const now = new Date();
        const activeLeaves = await db
        .select()
        .from(ha_availability)
        .where(
            and(
            eq(ha_availability.ha_id, userId),
            gt(ha_availability.end_date, now),
            eq(ha_availability.processed, false)
            )
        );

        if (activeLeaves.length === 0) {
        throw new NotFoundException("No active leave record found for cancellation.");
        }

        try {
            await db
            .update(ha_details)
            .set({ is_onLeave: false, is_available: true })
            .where(eq(ha_details.ha_id, userId));


            await db
            .update(ha_availability)
            .set({ processed: true })
            .where(eq(ha_availability.ha_id, userId));

            await redis.del(`ha:leave:${userId}`);
            const availabilityKey = `ha:availability:${userId}`;
            await redis.set(availabilityKey, JSON.stringify({ is_available: true, is_onLeave: false }));

            return;
        } catch (error) {
            throw new InternalServerException(
                "Error while updating the HA_details and HA_availability table",
                ErrorCode.INTERNAL_SERVER_ERROR
            )
        }
    }



    
}
