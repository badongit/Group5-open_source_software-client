import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function CustomTab({ nameTab, contentTab }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1"}}>
      <TabContext value={value}>
        <Box sx={{ borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						{nameTab.map((item, index) => {
							return (
								<Tab sx={{ width: "50%"}} label={item} value={`${index+1}`} />
							)
						})}
          </TabList>
				</Box>
				{
					contentTab.map((item, index) => {
						return (
							<TabPanel value={`${index+1}`} sx={{ padding: "unset !important" }}>{item}</TabPanel>
						)
					})
				}
      </TabContext>
    </Box>
  );
}
