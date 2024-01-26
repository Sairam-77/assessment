import { useState } from 'react'
import './App.css'
import { Anchor, Button, Drawer, Flex, Select, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface schemaType {
  label: string,
  value: string
}

function App() {
  let schema = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]
  const [opened, { open, close }] = useDisclosure(false);
  const [seletedSchema, setSelectedSchema]: any = useState();
  const [segmentName, setsegmentName]: any = useState("");
  const [seletedSchemaList, setSelectedSchemaList]: any = useState([]);
  const [availableSechema, setAvailableSechema] = useState(schema)
  const [errhandel, setErrorHandel] = useState({ name: false, addSchema: false })
  const [loading, setLoading] = useState(false)

  function addNewShema() {
    if (seletedSchema == undefined) {
      setErrorHandel({ ...errhandel, addSchema: true })
      return
    }


    let temp = availableSechema.find((e: schemaType) => e.value === seletedSchema);
    setSelectedSchemaList([...seletedSchemaList, temp]);

    let filteredSchemas = availableSechema.filter((e: schemaType) => e.value !== seletedSchema);
    setAvailableSechema(filteredSchemas);
    setSelectedSchema(null)


    // Reset the SelectComponent value after adding a new schema

  }

  function selectedSchemaChange(e: schemaType, curr: string, index: number) {

    let copy = [...seletedSchemaList];
    let temp = availableSechema.find((a: schemaType) => a.value === curr);

    copy[index] = temp;
    setSelectedSchemaList(copy);


    let fiterForAvailable = availableSechema.filter((a: schemaType) => a.value !== temp?.value);
    setAvailableSechema([...fiterForAvailable, e])
    // console.log(e, curr);

  }

  function clearData() {
    setsegmentName('')
    setAvailableSechema(schema)
    setSelectedSchemaList([])
    setSelectedSchema(null)
    close()
  }

  async function handelSubmit() {
    if (segmentName.length <= 0 && seletedSchemaList.length <= 0) {
      return setErrorHandel({ name: true, addSchema: true })
    } else if (segmentName.length <= 0) {
      return setErrorHandel({ name: true, addSchema: false })
    } else if (seletedSchemaList.length <= 0) {
      return setErrorHandel({ name: false, addSchema: true })
    }
    try {
      setLoading(true)
      const config = {
        headers: { "Content-type": "application/json", },
        method: "POST",
        body: JSON.stringify({
          segment_name: segmentName,
          schema: seletedSchemaList.map((item: schemaType) => ({ [item.value]: item.label }))
        }),
      }
      await fetch("https://webhook.site/dd582337-665f-419d-840e-79d5d05a0c0b", config);
      clearData()

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
      clearData()

    }
  }

  return (
    <Flex justify={"center"} align={"center"} h={"100vh"}>
      <Button variant="filled" size="md" color='teal' onClick={open}>Save segmant</Button>
      <Drawer.Root opened={opened} onClose={close} position='right'>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header bg={"teal"}>

            <Drawer.Title c={"#fff"} fz={"20px"}>
              <span onClick={close} style={{ cursor: "pointer" }}><i className="fa-solid fa-chevron-left"></i></span>  Saving Segment
            </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body py={10}>
            <TextInput
              py={5}
              placeholder='Name of the Segment'
              size='md'
              value={segmentName}
              label={<Text>Enter the Name of the Segment</Text>}
              error={errhandel.name ? "Name of the Segment is required" : ""}
              onChange={(e) => {
                setErrorHandel({ name: false, addSchema: false })
                setsegmentName(e.target.value)
              }}
            />
            <Text lh={"xs"} fz={"15px"} c={"gray"} >To save your segment, you need to add the schemas to build the query</Text>

            {/* seleted schema */}
            {seletedSchemaList?.length > 0 && <Flex direction={"column"} gap={5} my={10} style={{ border: "2px solid #87CEEB", borderRadius: "5px" }} p={10}>
              {seletedSchemaList?.map((e: schemaType, index: number) => {
                return <Select
                  key={index}
                  placeholder={e.label}
                  data={availableSechema}
                  onChange={(curr: any) => {

                    selectedSchemaChange(e, curr, index)
                  }}
                />
              })}

            </Flex>}

            {/* to add schema */}
            <Flex direction={"column"} gap={10} py={10}>
              <Select

                placeholder="Add schema to segment"
                value={seletedSchema}
                data={availableSechema}
                onChange={(e: any) => {

                  setErrorHandel({ ...errhandel, addSchema: false })
                  setSelectedSchema(e)
                }

                }
                error={errhandel.addSchema ? "Please select the schema" : ""}

              />

              <Anchor type="re" c={"teal"} onClick={addNewShema}>
                +Add new schema
              </Anchor>

            </Flex>

            <Flex gap={10} pos={"absolute"} bottom={2}>
              <Button variant="filled" size="sm" color='teal' onClick={handelSubmit} loading={loading} disabled={loading}>Save the segmant</Button>
              <Button variant="filled" size="sm" color={"red"} onClick={() => {
                clearData()
              }}>cancel</Button>
            </Flex>

          </Drawer.Body>

        </Drawer.Content>
      </Drawer.Root>
    </Flex>
  )
}

export default App
