import { styles } from "@/config/constants";
import { FolderOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { getAlbums } from "../api/get-albums";

export default function AlbumSelector() {
  const [albumName] = useState<string>("Placeholder album");

  /**
   * TODO:
   * - open modal to select albums
   * - call album api
   * - use redux to cache/store selected album details
   */

  async function openAlbums() {
    const response = await getAlbums();

    console.log(response);
  }

  return (
    <Button
      sx={{
        position: "absolute",
        top: `${styles.viewport.margin}`,
        left: `${styles.viewport.margin}`,
        padding: " 10px 15px",
        borderRadius: "10px",

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,
      }}
      variant="contained"
      onClick={openAlbums}
    >
      <Stack direction="row" spacing="15px">
        <FolderOutlined />
        <Typography sx={{ fontVariantCaps: "normal" }}>{albumName}</Typography>
      </Stack>
    </Button>
  );
}
