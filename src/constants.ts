import CategoryIcon from "@mui/icons-material/Category";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { NoteCategoryName } from "types";

export const CategoryColorMap: { [x in NoteCategoryName]: string } = {
  [NoteCategoryName.WORK]: "#026C9C",
  [NoteCategoryName.PERSONAL]: "#017869",
  [NoteCategoryName.STUDY]: "#FCAE00",
  [NoteCategoryName.OTHER]: "#FEAA8B",
  [NoteCategoryName.UNCATEGORIZED]: "#000000",
};

export const CategoryIconMap: {
  [x in NoteCategoryName]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
} = {
  [NoteCategoryName.WORK]: WorkIcon,
  [NoteCategoryName.PERSONAL]: HomeIcon,
  [NoteCategoryName.STUDY]: SchoolIcon,
  [NoteCategoryName.OTHER]: CategoryIcon,
  [NoteCategoryName.UNCATEGORIZED]: EventBusyIcon,
};
