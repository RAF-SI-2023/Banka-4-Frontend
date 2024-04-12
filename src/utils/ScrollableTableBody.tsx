import { Table } from "@mui/material";
import { ReactNode } from "react";
import { ScrollContainer } from "./tableStyles";

interface ScrollableTableBodyProps {
    children: ReactNode;
}

const ScrollableTableBody: React.FC<ScrollableTableBodyProps> = ({ children }) => {
    return (
        <ScrollContainer>
            <Table>
                {children}
            </Table>
        </ScrollContainer>
    );
};

export default ScrollableTableBody;
