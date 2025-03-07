"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Mail } from "lucide-react";
import { IOTP } from "@/types/user";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLoginMutation } from "@/lib/services/user.service";

// Types
interface ILogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { mutateAsync: login } = useLoginMutation();

  // Direct login form
  const loginFormik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      password: Yup.string().required("Mot de passe requis"),
    }),
    async onSubmit(values) {
      console.log(values);
      try {
        // Simulate login API call
        await login(values);

        toast.success("Connexion réussie");
        loginFormik.resetForm();
        router.push("/");
      } catch {
        toast.error("Erreur lors de la connexion");
      }
    },
  });

  // OTP form
  const otpFormik = useFormik<IOTP>({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email invalide").required("Email requis"),
      otp: isOtpSent
        ? Yup.string()
            .required("Code OTP requis")
            .length(6, "Le code OTP doit contenir 6 chiffres")
        : Yup.string(),
    }),
    async onSubmit(values) {
      console.log(values);
      try {
        if (!isOtpSent) {
          // Request OTP
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setIsOtpSent(true);
          toast.success("Code OTP envoyé à votre email");
        } else {
          // Verify OTP
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success("Connexion réussie");
          otpFormik.resetForm();
          setIsOtpSent(false);
          router.push("/");
        }
      } catch {
        toast.error("Erreur lors de l'envoi/vérification du code OTP");
      }
    },
  });

  return (
    <div className="mx-auto max-w-4xl h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 relative">
      <div className="space-y-7 w-full">
        {/* Header */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {"7 October Calendar"}
          </h1>
        </div>

        {/* Form Container */}
        <div className="border border-[#D9DCE2] rounded-md flex flex-col md:flex-row md:space-x-16 p-6 sm:p-10 md:p-16 w-full">
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-xl sm:text-2xl font-medium mb-3.5">
              Bienvenue
            </h1>
            <div className="space-y-4 text-sm sm:text-base">
              <p>
                {`Vous êtes à un pas d'accéder à un outil puissant conçu pour
                simplifier votre flux de travail. En quelques clics, accédez à tous
                vos projets, tâches et rappels, et gardez tout à jour.`}
              </p>
              <p>Un espace de travail personnalisé - adapté à vos besoins.</p>
              <p>Connectez-vous et commençons</p>
            </div>
          </div>

          {/* Login Forms */}
          <div className="flex-1">
            <Tabs defaultValue="direct" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="direct">Connexion directe</TabsTrigger>
                <TabsTrigger value="otp">Connexion OTP</TabsTrigger>
              </TabsList>

              {/* Direct Login */}
              <TabsContent value="direct">
                <form className="space-y-4" onSubmit={loginFormik.handleSubmit}>
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold mb-1">
                      {"Nom d'utilisateur"}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="focus-visible:ring-primary"
                      value={loginFormik.values.email}
                      onChange={loginFormik.handleChange}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email && (
                      <p className="text-red-500 text-sm">
                        {loginFormik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-semibold mb-1">
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                      value={loginFormik.values.password}
                      onChange={loginFormik.handleChange}
                      className="focus-visible:ring-primary"
                    />
                    {loginFormik.touched.password &&
                      loginFormik.errors.password && (
                        <p className="text-red-500 text-sm">
                          {loginFormik.errors.password}
                        </p>
                      )}
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                    disabled={loginFormik.isSubmitting}
                  >
                    {loginFormik.isSubmitting
                      ? "Connexion en cours..."
                      : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>

              {/* OTP Login */}
              <TabsContent value="otp">
                <form className="space-y-4" onSubmit={otpFormik.handleSubmit}>
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="otp-email" className="font-semibold mb-1">
                      Adresse email
                    </Label>
                    <Input
                      id="otp-email"
                      name="email"
                      placeholder="Entrez votre email"
                      className="focus-visible:ring-primary"
                      value={otpFormik.values.email}
                      onChange={otpFormik.handleChange}
                      disabled={isOtpSent}
                    />

                    {otpFormik.touched.email && otpFormik.errors.email && (
                      <p className="text-red-500 text-sm">
                        {otpFormik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* OTP Input (shown only after OTP is sent) */}
                  {isOtpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="font-semibold mb-1">
                        Code OTP
                      </Label>
                      {/* <Input
                        id="otp"
                        name="otp"
                        placeholder="Entrez le code à 6 chiffres"
                        className="focus-visible:ring-primary"
                        value={otpFormik.values.otp}
                        onChange={otpFormik.handleChange}
                        maxLength={6}
                      /> */}
                      <InputOTP maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {otpFormik.touched.otp && otpFormik.errors.otp && (
                        <p className="text-red-500 text-sm">
                          {otpFormik.errors.otp}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Request OTP / Verify OTP Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                    disabled={otpFormik.isSubmitting}
                  >
                    {otpFormik.isSubmitting ? (
                      "Traitement en cours..."
                    ) : isOtpSent ? (
                      "Vérifier le code OTP"
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail size={16} />
                        Recevoir un code OTP
                      </span>
                    )}
                  </Button>

                  {/* Reset OTP Button (shown only after OTP is sent) */}
                  {isOtpSent && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsOtpSent(false);
                        otpFormik.setFieldValue("otp", "");
                      }}
                    >
                      Demander un nouveau code
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
