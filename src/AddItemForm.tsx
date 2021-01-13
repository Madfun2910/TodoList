import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log('AddItemForm called')
    const addItem = props.addItem

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    };
    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)
        }
        if (e.key === "Enter") {
            onAddTaskClick()
        }
    };

    return (
        <div>
            <TextField variant={"outlined"} size={"small"}
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyUpHandler}
                       label="Title"
                       helperText={error}
                // className={error ? "error" : ""}

            />
            <IconButton color="primary"
                        onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>

            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )

});


export default AddItemForm