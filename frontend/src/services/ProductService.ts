import { IProduct } from "../types/interfaces";

export default class ProductService {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_BACKEND_URL!;
  }

  async getAllProducts(): Promise<IProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao obter os produtos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro na requisição fetch:", error);
      throw error;
    }
  }

  async createProduct(product: IProduct): Promise<void> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  async updateProduct(product: IProduct): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      var response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Não foi possivel deletar o produto");
      }
    } catch (error) {
      console.error("Erro na requisição fetch:", error);
      throw error;
    }
  }
}
