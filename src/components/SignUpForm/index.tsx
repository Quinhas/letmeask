import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  OtherProps,
  useColorMode,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { useState } from "react";
import { FormEvent } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "src/hooks/useAuth";
import { Link as RouterLink, useHistory } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
  name: string;
};

type SignUpFormProps = {
  initialEmail?: string;
  initialPassword?: string;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const [loading, setLoading] = useState(false);
  const { createUserWithEmailAndPassword } = useAuth();
  const { touched, errors, isValid, handleBlur, handleChange } = props;
  const { colorMode } = useColorMode();
  const toast = useToast();
  const history = useHistory();

  async function handleSignUpButton(ev: FormEvent) {
    ev.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        props.values.email,
        props.values.password,
        props.values.name
      );
      toast({
        description: "Usuário registrado com sucesso.",
        status: "success",
        isClosable: true,
      });
      history.push("/");
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    }
    setLoading(false);
  }

  return (
    <Flex as={Form} gridGap={"1rem"} direction={"column"}>
      <FormControl isInvalid={errors.email && touched.email ? true : false}>
        <Input
          as={Field}
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
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
          onChange={handleChange}
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
      <FormControl isInvalid={errors.name && touched.name ? true : false}>
        <Input
          as={Field}
          id="name"
          type="name"
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          onBlur={handleBlur}
          bg={colorMode === "light" ? "white" : "black"}
          color={colorMode === "light" ? "blackAlpha.800" : "whiteAlpha.800"}
          h={"3.125rem"}
          borderRadius={"0.5rem"}
          p={"0 1rem"}
          border={"1px solid"}
          w={"100%"}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant={"app"}
        w={"100%"}
        mt={"1rem"}
        rightIcon={<FaSignInAlt />}
        isLoading={loading}
        onClick={handleSignUpButton}
        disabled={!touched.email || !isValid || loading}
      >
        Registrar-se
      </Button>
      <Text
        fontSize={"0.875rem"}
        color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"}
      >
        Já possui uma conta?{" "}
        <Link as={RouterLink} to="/login" color={"secondaryApp.500"}>
          Clique aqui
        </Link>
      </Text>
    </Flex>
  );
};

export const SignUpForm = withFormik<SignUpFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: "",
      password: "",
      name: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "O e-mail é requerido.";
    }
    if (!values.password) {
      errors.password = "A senha é requerida.";
    }
    if (!values.name) {
      errors.name = "O nome é requerido.";
    }
    if (values.password.length < 6) {
      errors.password = "A senha deve possuir mais de 6 caracteres.";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);
