import React from "react";
import { MintTransaction } from "../../utils/mint";
import styles from "./box.module.css";
import { MAX_AMOUNT, OPENSEA_URL, MAX_BATCH_SIZE } from "../../utils/configuration";
import { Button } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';


export const MintBox = ({ data }) => {
  const [amount, setAmount] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAmount(event.target.value);
    data.setState({
      count: parseInt(event.target.value)
    })
  };
  const menuList = Array.from({ length: MAX_BATCH_SIZE }, (_, i) => i + 1);
  return (
    <div className={styles.boxWrapper}>
      {(data.state.mintedNum >= MAX_AMOUNT) ? (
        <div className={styles.boxWrapperTop}>
          <p>
            Sold out!
            <a href={OPENSEA_URL}>
              <span>Opensea</span>{" "}
            </a>{" "}
          </p>
        </div>)
        :
        (<div className={styles.boxWrapperTop}>
          <h1 class="language" data-name="WebTitle">BEAUTIFUL WORLD</h1>
          <div className={styles.boxWrapperTopContent}>
          
            <Box sx={{ minWidth: 90 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  value={amount}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {menuList.map((item, i) => {
                    return (<MenuItem value={item}>{item}</MenuItem>);
                  })}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" disabled={!data.state.connected} onClick={() => {
              console.log("MINT DATA", data);
              MintTransaction(data);
              data.setState({
                containedModalShow: true,
                modalDialogBodyText: `Claiming ${data.state.count}`
              })
            }}> Mint</Button>
          </div>
          <p>{data.state.mintedNum}/{MAX_AMOUNT} Minted</p>
          <p> A total of 10,000 NFTs in the beautiful world, you are early, and it is expected to start casting in July.  It is a work of art, no discord, cc0.</p>
          <p>2000/Free Mint</p>    
          <p>8000/0.006ETH</p>
        </div>)}
    </div>
  );
};
