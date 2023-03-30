import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { Box, Typography, useMediaQuery, TextField, Button, Card, } from "@mui/material";

const Home = () => {
    //media
    const isNotMobile = useMediaQuery("(min-width: 1000px)");
    // states
    const [text, settext] = useState("");
    const [para, setPara] = useState("");
    const [loading, setLoading] = useState(false)

    //register ctrl
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post("/api/v1/openai/paragraph", { text });
            if (response.status === 201) {
                setLoading(false)
                setPara(response.data);
            } else {
                setLoading(false)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box
            width={isNotMobile ? "60%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    placeholder="Add Your Keyword or Query"
                    type="text"
                    multiline={true}
                    required
                    margin="normal"
                    fullWidth
                    value={text}
                    onChange={(e) => {
                        settext(e.target.value);
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ color: "white", mt: 2 }}
                >
                    Generate
                </Button>
            </form>

            {para ? (
                <Card
                    sx={{
                        mt: 4,
                        border: 1,
                        boxShadow: 0,
                        height: "450px",
                        borderRadius: 5,
                        borderColor: "natural.medium",
                        bgcolor: "background.default",
                    }}
                >
                    <Typography p={2}>{para}</Typography>
                </Card>
            ) : (
                <Card
                    sx={{
                        mt: 4,
                        border: 1,
                        boxShadow: 0,
                        height: "450px",
                        borderRadius: 5,
                        borderColor: "natural.medium",
                        bgcolor: "background.default",
                    }}
                >
                    <Typography
                        variant="h5"
                        color="natural.main"
                        sx={{
                            textAlign: "center",
                            verticalAlign: "middel",
                            lineHeight: "450px",
                        }}
                    >
                        {
                            loading ? (
                                <>
                                    Generating Result...
                                </>
                            )
                                : (
                                    <>
                                        Your Result Will Be Here
                                    </>
                                )
                        }
                    </Typography>
                </Card>
            )}
        </Box>
    );
};

export default Home;