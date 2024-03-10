import { DiPhp } from "react-icons/di";
import { DiPython } from "react-icons/di";
import * as mui from '@mui/material'
interface CodeProps {
    Code?: string;
    Type:  'php' | 'python';
}
const CodeResult: React.FC<CodeProps> = ({ Code, Type }) => { // ALPHA ( i not have idea to show te code)
    if (!Code)
        return null;
    function HandleIcon() {
        if (Type === "php")
            return <DiPhp size={44} color="inherit" />
         if (Type === "python")
            return <DiPython size={44} color="inherit" />

    }
    return (
        <mui.Box
            sx={{ m: 1 }}>

            <mui.Typography>
                Result:
            </mui.Typography>
            <mui.Box>
                <mui.Grid>
                {HandleIcon()}

                <mui.Paper variant='elevation'>
                    <mui.Box
                        sx={{ m: 1, p: 2 }}>
                        {Code}
                    </mui.Box>
                </mui.Paper>
                </mui.Grid>
            </mui.Box>
        </mui.Box>


    )
}
export default CodeResult