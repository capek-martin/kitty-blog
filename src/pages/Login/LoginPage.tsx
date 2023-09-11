import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import "./LoginPage.style.scss";
import { Box, Button, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput/TextInput";
import { UserInputs } from "../../types/app/user.type";

/**
 * User login / registration page
 */
export const LoginPage = () => {
  const { login, registerTenant } = useAuth();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const isRestricted = location?.state && location?.state?.restricted;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    if (isRegister) {
      registerTenant && registerTenant(data.email, data.password);
      setIsRegister(false);
    } else {
      login && login(data.email, data.password);
    }
  };

  useEffect(() => {
    reset({ email: "", password: "" });
  }, [isRegister]);

  return (
    <>
      <Box
        className="container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 5,
        }}
      >
        {isRestricted && (
          <Alert
            severity="error"
            style={{
              textAlign: "center",
              position: "absolute",
              top: "4rem",
              width: "45%",
            }}
          >
            You´re trying to reach restricted area. Please sign in first!
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ width: "100%", px: 4 }}
        >
          <h4>{isRegister ? `Register` : `Log in`}</h4>
          <TextInput
            autoFocus
            name="email"
            label="Email address*"
            control={control}
            rules={{ required: "Email is required" }}
            errors={errors}
            placeholder="me@example.com"
            type="email"
          />
          <TextInput
            autoFocus
            name="password"
            label="Password*"
            control={control}
            rules={{ required: "Password is required" }}
            errors={errors}
            placeholder="**********"
            autoComplete="current-password"
            type="password"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, float: "right" }}
          >
            {isRegister ? `Register` : `Log in`}
          </Button>
          {isRegister ? (
            <span className="link" onClick={() => setIsRegister(false)}>
              Already have account?
            </span>
          ) : (
            <span className="link" onClick={() => setIsRegister(true)}>
              Dont have account yet?
            </span>
          )}
        </Box>
      </Box>
    </>
  );
};
