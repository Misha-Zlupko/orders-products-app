"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";

type LoginValues = { email: string; password: string };

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useLocale();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("auth.validation.emailInvalid"))
      .required(t("auth.validation.emailRequired")),
    password: Yup.string()
      .min(6, t("auth.validation.passwordMin"))
      .required(t("auth.validation.passwordRequired")),
  });

  const initialValues: LoginValues = { email: "", password: "" };

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
                  <h1 className="h3 fw-bold mb-2">{t("auth.login.title")}</h1>
                  <p className="text-muted small">{t("auth.login.subtitle")}</p>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={async (
                    values,
                    { setSubmitting, setFieldError }
                  ) => {
                    const success = await login(values.email, values.password);
                    setSubmitting(false);
                    if (success) {
                      router.push("/");
                    } else {
                      setFieldError(
                        "email",
                        t("auth.login.errorInvalidCredentials")
                      );
                    }
                  }}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form noValidate>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          {t("auth.login.email")}
                        </label>
                        <Field
                          name="email"
                          type="email"
                          id="email"
                          className={`form-control ${
                            errors.email && touched.email ? "is-invalid" : ""
                          }`}
                          placeholder={t("auth.login.placeholderEmail")}
                          autoComplete="email"
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="form-label">
                          {t("auth.login.password")}
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
                          placeholder={t("auth.login.placeholderPassword")}
                          autoComplete="current-password"
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
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
                          ? t("auth.login.submitting")
                          : t("auth.login.submit")}
                      </button>
                    </Form>
                  )}
                </Formik>

                <p className="text-center text-muted small mt-4 mb-0">
                  {t("auth.login.noAccount")}{" "}
                  <Link
                    href="/auth/register"
                    className=" fw-medium"
                    style={{ color: "#10b981" }}
                  >
                    {t("auth.login.registerLink")}
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
