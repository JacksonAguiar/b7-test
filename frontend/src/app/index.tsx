import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { IProduct } from "../types/interfaces";

import ProductService from "../services/ProductService";
import FormComponent from "./components/FormComponent";
import TableComponent from "./components/TableComponent";

import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const service = new ProductService();

function App() {
  const [isUpdate, enableUpdate] = useState<boolean>(false);
  const [data, setData] = useState<IProduct[]>([]);

  const fecthProducts = async () => {
    var res = await service.getAllProducts();
    setData(res);
  };

  useEffect(() => {
    fecthProducts();
  }, []);
  
  const validationSchema = Yup.object().shape({
    id: Yup.string().notRequired(),
    name: Yup.string().required("Nome é requerido").typeError('Valor inválido'),
    price: Yup.number().required("Preço é requerido").typeError('Valor inválido'),
    amount: Yup.number().required("Quantidade é requerido").typeError('Valor inválido'),
  });

  async function onSubmit(data: any) {
    return isUpdate ? await updateProduct(data) : await createProduct(data);
  }

  const getErrorMsg = () => {
    if (errors) {
      if (errors.name) {
        return "Campo nome: "+ errors.name?.message;
      }
      if (errors.price) {
        return "Campo preço: "+ errors.price?.message;
      }
      if (errors.amount) {
        return "Campo quantidade: "+ errors.amount?.message;
      }
    }
  };

  async function createProduct(data: any) {
    await service.createProduct(data).catch((err) => console.log(err));
    await fecthProducts();
    reset();
  }

  async function updateProduct(data: any) {
    await service.updateProduct(data).catch((err) => console.log(err));
    enableUpdate((prev) => !prev);
    await fecthProducts();
    reset();
  }
  async function deleteProduct(id: string) {
    await service.deleteProduct(id).catch((err) => console.log(err));
    await fecthProducts();
  }

  const sendToFormUpdate = (p: IProduct) => {
    enableUpdate((prev) => !prev);
    setValue("id", p.id);
    setValue("name", p.name);
    setValue("amount", p.amount);
    setValue("price", p.price);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <section className="container">
      <FormComponent
        isUpdate={isUpdate}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errorMessage={getErrorMsg()}
      />
      <TableComponent
        data={data}
        onDelete={deleteProduct}
        onUpdate={sendToFormUpdate}
      />
      <ToastContainer />
    </section>
  );
}

export default App;
