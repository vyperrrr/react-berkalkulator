import {
  Flex,
  Container,
  Heading,
  IconButton,
  Box,
  Table,
  Tabs,
} from "@radix-ui/themes";

import { PlusIcon } from "@radix-ui/react-icons";

import SalaryCalculator from "./components/SalaryCalculator/SalaryCalculator";

export default function App() {
  return (
    <Container className="">
      <Box m="4">
        <Tabs.Root defaultValue="account" className="relative mb-4">
          <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
            <IconButton className="absolute right-0">
              <PlusIcon width="18" height="18" />
            </IconButton>
          </Tabs.List>
        </Tabs.Root>
        <Flex
          direction="row"
          gapX={{ xs: "0", sm: "6" }}
          gapY={{ initial: "6", md: "0" }}
          wrap="wrap"
          className="justify-center"
        >
          <SalaryCalculator />
          <Box>
            <Heading size="3" className="text-center">
              Háztartás összesített jövedelme
            </Heading>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                  <Table.Cell>danilo@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                  <Table.Cell>zahra@example.com</Table.Cell>
                  <Table.Cell>Admin</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                  <Table.Cell>jasper@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
