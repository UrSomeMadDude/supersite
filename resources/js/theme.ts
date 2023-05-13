import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
    },
});

export default theme;
