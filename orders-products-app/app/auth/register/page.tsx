"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const { t } = useLocale();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("auth.validation.nameMin"))
      .max(50, t("auth.validation.nameMax"))
      .required(t("auth.validation.nameRequired")),
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        t("auth.validation.passwordLettersDigits")
      )
      .required(t("auth.validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("auth.validation.confirmMatch"))
      .required(t("auth.validation.confirmRequired")),
  });

  const initialValues: RegisterValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light py-5"
      style={{ minHeight: "100%" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold mb-2">
                    {t("auth.register.title")}
                  </h1>
                  <p className="text-muted small">
                    {t("auth.register.subtitle")}
                  </p>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={registerSchema}
                  onSubmit={async (
                    values,
                    { setSubmitting, setFieldError }
                  ) => {
                    const success = await register(
                      values.email,
                      values.password,
                      values.name
                    );
                    setSubmitting(false);
                    if (success) {
                      router.push("/");
                    } else {
                      setFieldError(
                        "email",
                        t("auth.register.errorEmailExists")
                      );
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form noValidate>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          {t("auth.register.name")}
                        </label>
                        <Field
                          name="name"
                          type="text"
                          id="name"
                          className={`form-control ${
                            errors.name && touched.name ? "is-invalid" : ""
                          }`}
                          placeholder={t("auth.register.placeholderName")}
                          autoComplete="name"
                        />
                        {errors.name && touched.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          {t("auth.register.email")}
                        </label>
                        <Field
                          name="email"
                          type="email"
                          id="email"
                          className={`form-control ${
                            errors.email && touched.email ? "is-invalid" : ""
                          }`}
                          placeholder={t("auth.register.placeholderEmail")}
                          autoComplete="email"
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          {t("auth.register.password")}
                        </label>
                        <Field
                          name="password"
                          type="password"
                          id="password"
                          className={`form-control ${
                            errors.password && touched.password
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder={t("auth.register.placeholderPassword")}
                          autoComplete="new-password"
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">
                          {t("auth.register.confirmPassword")}
                        </label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          id="confirmPassword"
                          className={`form-control ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder={t("auth.register.placeholderConfirm")}
                          autoComplete="new-password"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="invalid-feedback d-block">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-2 fw-semibold"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: "#10b981",
                          color: "white",
                        }}
                      >
                        {isSubmitting
                          ? t("auth.register.submitting")
                          : t("auth.register.submit")}
                      </button>
                    </Form>
                  )}
                </Formik>

                <p className="text-center text-muted small mt-4 mb-0">
                  {t("auth.register.hasAccount")}{" "}
                  <Link href="/auth/login" className="text-success fw-medium">
                    {t("auth.register.loginLink")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
