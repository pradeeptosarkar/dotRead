import { Box } from "@primer/react";
import SplitContainer from "../components/SplitContainer";
import "./CodePage.css";
import { Button, IconButton } from "@primer/react";
import { SidebarCollapseIcon, SidebarExpandIcon } from "@primer/octicons-react";
import { useState } from "react";

export default function CodePage({ param, setShowEditor }) {
  // state for managing files collapse or expand
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Box bg="canvas.default" width="100%" minHeight="100vh">
      <div className="headerFlex">
        <div className="repoInfoDiv">
          <div>
            {isSidebarCollapsed ? (
              <IconButton
                onClick={() => setIsSidebarCollapsed(false)}
                aria-label="expand"
                icon={SidebarExpandIcon}
                sx={{ ml: 2 }}
              />
            ) : (
              <IconButton
                onClick={() => setIsSidebarCollapsed(true)}
                aria-label="collapse"
                icon={SidebarCollapseIcon}
                sx={{ ml: 2 }}
              />
            )}
          </div>
          <div className="repoNameDiv">{`${param.owner} / ${param.name}`}</div>
          {/* <div>{`Branch`}</div> */}
        </div>
        <div className="closeBtnDiv">
          <Button variant="danger" onClick={() => setShowEditor(false)}>
            Close
          </Button>
        </div>
      </div>
      <SplitContainer param={param} isSidebarCollapsed={isSidebarCollapsed} />
    </Box>
  );
}
