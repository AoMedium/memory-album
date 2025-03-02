import { Folder, FolderOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function AlbumSelector() {
  const [albumName, setAlbumName] = useState<string>("Placeholder album");

  /**
   * TODO:
   * - open modal to select albums
   * - call album api
   * - use redux to cache/store selected album details
   */

  return (
    <Button
      sx={{
        position: "absolute",
        top: "30px",
        left: "30px",
        padding: "15px",
        borderRadius: "10px",

        background: "white",
        color: "black",
      }}
      variant="contained"
    >
      <Stack direction="row" spacing="15px">
        <FolderOutlined />
        <Typography sx={{ fontVariantCaps: "normal" }}>{albumName}</Typography>
      </Stack>
    </Button>
  );
}
