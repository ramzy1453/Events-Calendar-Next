"use client";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILogin } from "@/types/user";
import { toast } from "sonner";
import { loginSchema } from "@/lib/validation/user.schema";
import { useLoginMutation } from "@/lib/services/user.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { mutateAsync: login } = useLoginMutation();
  const router = useRouter();

  const formik = useFormik<ILogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    async onSubmit(values) {
      toast.promise(login(values), {
        loading: "Connecting...",
        success: "Successfully connected",
        error: (error) => {
          return error.response.data.message || "Error during connection";
        },
      });
      formik.resetForm();
      router.push("/");
    },
  });

  return (
    <div className="mx-auto max-w-4xl h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 relative">
      <div className="space-y-7 w-full">
        {/* Header  */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {"Gestion d'exploitations"}
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

          {/* Form */}
          <div className="flex-1">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              {/* Nom d'utilisateur */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold mb-1">
                  {"Nom d'utilisateur"}
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="focus-visible:ring-colors-blue-6"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold mb-1">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="focus-visible:ring-colors-blue-6"
                />
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                className="w-full bg-colors-blue-6 hover:bg-colors-blue-7 text-white font-medium"
              >
                Se connecter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
