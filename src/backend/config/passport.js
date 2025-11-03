import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const prisma = new PrismaClient();

passport.use(
    new GoogleStrategy({
        clientID: process.CLIENT_ID,
        clientSecret: process.CLIENT_SECRET,
        callbackURL:'api/auth/google/callback',
        },

        async(profile, done) =>{
            try{
                const email = profile.emails[0].value;
                const googleID = profile.id;

                //verificar que el usuario no exista en la BD
                let user = await prisma.user.findUnique({
                    where:{ googleId },
                });

                //Buscamos al usuario para actualizarlo con el metodo de google
                if(!user){
                    user = await prisma.user.findUnique ({
                            where: { email }
                        });
                        //Si encontramos al usuario lo actualizamos con google
                    if(user){
                        user = await prisma.user.update({
                        where: { email },
                        data: { googleId: googleId, 
                            avatar: profile.photos[0].value,
                        }
                    });
                }} else {
                    user = await prisma.user.create({
                        data:{
                            email: email,
                            name: profile.displayName,
                            googleId: googleId,
                            avatar: profile.photos[0].value,
                        }
                    });
                }

                return done(null, user);
            }catch(error){
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser(async(id,done) =>{
    try{
        const user = await prisma.user.findUnique({where: id});
        done(null, user);
    }catch(error){
        done(error, null);
    }
});