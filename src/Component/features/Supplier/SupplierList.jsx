import React,{useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSupplierList } from "./SupplierSlice";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function SupplierList() {
    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.supplier.supplierList);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("🔄 useEffect activated! Fetching data...");
        setLoading(true);
        window.scrollTo(0, 0);
        dispatch(getSupplierList())
            .unwrap()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress size={50} />
                <Typography mt={2}>🔄 Loading data...</Typography>
            </Box>
        );
    }

    if (!suppliers || suppliers.length === 0) {
        return (
            <Typography textAlign="center" mt={5} fontSize={20} fontWeight="bold">
                😕 No suppliers available
            </Typography>
        );
    }

    return (
        <>
            <div style={{ paddingTop: "50px", marginTop: '150px' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            gutterBottom
                        >
                            Supplier List
                        </Typography>
                    </Grid>
                    {suppliers.map((supplier) => (
                        <Grid item key={supplier.id}>
                            <Link
                                to="/SupplierModel"
                                state={{ supplierId: supplier.id }}
                                style={{ textDecoration: "none", display: "block" }}
                            >
                                <Card
                                    sx={{
                                        maxWidth: "18vw",
                                        height: "30vh",
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        transition: "transform 0.3s",
                                        "&:hover": { transform: "scale(1.05)" },
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "#f9f9f9",
                                        cursor: "pointer",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            textAlign: "center",
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            fontSize={14}
                                        >
                                            {supplier.name}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            sx={{ mt: 1, fontSize: 12 }}
                                        >
                                            {supplier.phone}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="secondary"
                                            fontWeight="bold"
                                            sx={{ mt: 2, fontSize: 14 }}
                                        >
                                            {supplier.email} :מייל ספק
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            fontWeight="bold"
                                            sx={{ mt: 2, fontSize: 14 }}
                                        >
                                            Rating: {supplier.rating}
                                        </Typography>
                                        <Stack spacing={1} sx={{ mt: 2 }}>
                                            <Rating
                                                name="half-rating-read"
                                                defaultValue={supplier.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
}