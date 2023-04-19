import React from "react";

import { Box, Typography } from "@mui/material";
import Book from "@/components/book";

export default function ReadBooks () {
    return (
        <Box sx={{ width: '100%', marginTop: 10, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h4">Books you read</Typography>
            <Box sx={{ display: 'flex', padding: 10 }}>
                <Book />
                <Book />
                <Book />
                <Book />
            </Box>
        </Box>
    )
}