import { Input, Button } from "@chakra-ui/react";

import "./styles.css";

interface Props {
  onSubmit: (data: any) => void;
  isUpdate: boolean;
  errorMessage?: string | undefined;
  register: any;
}

const FormComponent = (props: Props) => {
  return (
    <form className="form-section" onSubmit={props.onSubmit}>
      <h1>{props.isUpdate ? "Atualizar" : "Adicionar um produto"}</h1>
      <div className="input-group">
        <Input
          type="text"
          htmlSize={2}
          placeholder="Nome do produto"
          {...props.register("name")}
        />
        <input hidden />
        <Input
          type="number"
          placeholder="Quantidade"
          {...props.register("amount")}
        />

        <Input type="text" placeholder="Preço" {...props.register("price")} />
      </div>
      <span className="error-msg">{props.errorMessage}</span>
      <Button type="submit" variant="solid">
        Salvar
      </Button>
    </form>
  );
};

export default FormComponent;
