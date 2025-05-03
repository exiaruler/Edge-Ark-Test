import { Box, Grid } from "@mui/material";
import FormControl from "../components/FormControl";
import FileInput from "../components/FileInput";
import TextInput from "../components/TextInput";

export default function search(){
    const submitHandle=()=>{

    }
    return(
        <div>
        <Box sx={{flexGrow:2}}>
        <Grid container rowSpacing={1}>
        <Grid size={{xs:2,md:4}}></Grid>
        <Grid size={{xs:2,md:4}}>
        <FormControl onSubmit={submitHandle} error={"error"} success={"succuess"} saveCaption="Search">
        <TextInput label={"Team"} onChange={undefined} />
        </FormControl>
        </Grid>
        </Grid>
        </Box>
        </div>
    )
}