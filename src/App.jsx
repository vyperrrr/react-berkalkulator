import {
  Flex,
  Section,
  Container,
  TextField,
  Text,
  Slider,
  Button,
  Heading,
  Switch,
  Badge,
  IconButton,
  Box,
  Table,
  Tabs,
  Strong,
} from "@radix-ui/themes";

import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

export default function App() {
  return (
    <Section>
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
            <Flex direction="column" gap="2" className="relative">
              <IconButton className="absolute right-0">
                <TrashIcon width="18" height="18" />
              </IconButton>
              <Heading size="4" className="uppercase">
                Bendi bérének kiszámítása
              </Heading>
              <Text size="3">Családtag neve</Text>
              <TextField.Root size="3" />
              <Text size="1">Add meg a családtag nevét!</Text>
              <Text size="3">Bruttó bér</Text>
              <TextField.Root size="3" />
              <Text size="1">Add meg a bruttó béredet!</Text>
              <Slider defaultValue={[50]} variant="soft" radius="small" />
              <Flex
                direction="row"
                gap="2"
                className="items-center justify-center"
              >
                <Button size="2" variant="soft">
                  -1%
                </Button>
                <Button size="2" variant="soft">
                  -5%
                </Button>
                <Button size="2" variant="soft">
                  +1%
                </Button>
                <Button size="2" variant="soft">
                  +5%
                </Button>
              </Flex>
              <Heading size="3">Kedvezmények</Heading>
              <Flex direction="column" gap="2">
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Switch size="1" defaultChecked radius="small" /> 25 év
                    alattiak SZJA mentessége
                  </Flex>
                </Text>
                <Flex gap="2" direction="row" wrap="wrap">
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Switch size="1" defaultChecked radius="small" /> Friss
                      házasok kedvezménye
                    </Flex>
                  </Text>
                  <Badge color="bronze">Dátum módosítása</Badge>
                  <Badge color="crimson">Nem jogosult</Badge>
                  <Badge color="green">Jogosult</Badge>
                </Flex>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Switch size="1" defaultChecked radius="small" /> Személyi
                    adókedvezmény
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="2">
                    <Switch size="1" defaultChecked radius="small" /> Családi
                    kedvezmény
                  </Flex>
                </Text>
                <Box>
                  <Flex gap="2" direction="column">
                    <Text size="2">Eltartottak száma</Text>
                    <Flex gap="2" direction="row" align="center">
                      <IconButton>
                        <MinusIcon width="18" height="18" />
                      </IconButton>
                      <Badge radius="small">0</Badge>
                      <IconButton>
                        <PlusIcon width="18" height="18" />
                      </IconButton>
                    </Flex>
                    <Text size="2">Kedvezményezettek száma</Text>
                    <Flex gap="2" direction="row" align="center">
                      <IconButton>
                        <MinusIcon width="18" height="18" />
                      </IconButton>
                      <Badge radius="small">0</Badge>
                      <IconButton>
                        <PlusIcon width="18" height="18" />
                      </IconButton>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
              <Text size="3">
                <Strong>Számított nettó bér</Strong>
              </Text>
              <Button variant="outline">130.000 Ft</Button>
            </Flex>

            <Flex gap="2" direction="column">
              <Heading size="3">Háztartás összesített jövedelme</Heading>
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
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Section>
  );
}
