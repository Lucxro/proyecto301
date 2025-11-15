import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || null;
        const googleId = profile.id?.toString() || null;
        const avatar = profile.photos?.[0]?.value || null;

        if (!email) return done(new Error("Google no devolvió email"), null);
        if (!googleId) return done(new Error("Google no devolvió googleId"), null);

        // Buscar por googleId
        let user = await prisma.user.findUnique({
          where: { googleId },
        });

        // Si no existe por googleId, buscar por email
        if (!user) {
          user = await prisma.user.findUnique({ where: { email } });

          if (user) {
            user = await prisma.user.update({
              where: { email },
              data: {
                googleId,
                avatar,
              },
            });
          } else {
            user = await prisma.user.create({
              data: {
                email,
                name: profile.displayName || "Usuario Google",
                googleId,
                avatar,
              },
            });
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error en GoogleStrategy:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;
