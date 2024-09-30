import { Box, Typography, Paper } from "@mui/material";
import CreateDay from "./CreateDay";

const CreateWeek = ({ week_num, num_days }) => {
    const newDayComponents = [];

    for (let i = 0; i < num_days; i++) {
        newDayComponents.push(<CreateDay key={i} day_num={i + 1} week_num={week_num} />);
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
                Week {week_num}
            </Typography>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                {newDayComponents}
            </Box>
        </Paper>
    );
};

export default CreateWeek;
