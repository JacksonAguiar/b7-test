import {
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { IProduct } from "../../../types/interfaces";
import "./styles.css";
import { EditIcon, Trash2Icon } from "lucide-react";

interface Props {
  data: IProduct[];
  onDelete: (id: string) => void;
  onUpdate: (p: IProduct) => void;
}

const TableComponent = (props: Props) => {
  return (
    <main>
      <h1>Produtos</h1>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Quantidade</Th>
              <Th isNumeric>Preço</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data.map((p, i) => {
              return (
                <Tr key={i}>
                  <Td>{p.name}</Td>
                  <Td>{p.amount}</Td>
                  <Td isNumeric>{p.price}</Td>
                  <Td>
                    <IconButton
                      size="sm"
                      aria-label=""
                      variant="ghost"
                      colorScheme="blue"
                      icon={<EditIcon />}
                      onClick={() => props.onUpdate(p)}
                    ></IconButton>
                    &nbsp;
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      aria-label=""
                      icon={<Trash2Icon />}
                      onClick={() => props.onDelete(p.id!)}
                    ></IconButton>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default TableComponent;
