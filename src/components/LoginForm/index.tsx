import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  OtherProps,
  useColorMode,
} from "@chakra-ui/react";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

type FormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  initialEmail?: string;
  initialPassword?: string;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, isValid, isInitialValid, handleBlur } =
    props;
  const { colorMode } = useColorMode();

  return (
    <Flex as={Form} gridGap={"1rem"} direction={"column"}>
      <FormControl isInvalid={errors.email && touched.email ? true : false}>
        <Input
          as={Field}
          id="email"
          type="email"
          name="email"
          onBlur={handleBlur}
          placeholder="E-mail"
          bg={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          h={"3.125rem"}
          borderRadius={"0.5rem"}
          p={"0 1rem"}
          border={"1px solid"}
          w={"100%"}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={errors.password && touched.password ? true : false}
      >
        <Input
          as={Field}
          id="password"
          type="password"
          name="password"
          placeholder="Senha"
          onBlur={handleBlur}
          bg={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          h={"3.125rem"}
          borderRadius={"0.5rem"}
          p={"0 1rem"}
          border={"1px solid"}
          w={"100%"}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant={"app"}
        w={"100%"}
        mt={"1rem"}
        rightIcon={<FaSignInAlt />}
        isLoading={isSubmitting}
        disabled={!isInitialValid || !isValid}
      >
        Login
      </Button>
    </Flex>
  );
};

export const LoginForm = withFormik<LoginFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: "",
      password: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Informe um e-mail";
    }
    if (!values.password) {
      errors.password = "A senha é requerida.";
    }
    if (values.password.length < 6) {
      errors.password = "A senha deve possuir mais de 6 caracteres.";
    }
    console.log(errors);
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);
