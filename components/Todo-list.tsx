import React from "react";
import {FlatList, StyleSheet} from 'react-native';
import ITodo from "../models/ITodo.model";
import Todo from "./Todo";

interface ITodoListProps {
    data: ITodo[],
    token: string
}

const TodoList = (props: ITodoListProps) => {
    return (
        <FlatList
            style={styles.container}
            data={props.data}
            renderItem={
                (item: any) => {
                    return (
                        <Todo data={item.item}/>
                    )
                }
            }
            keyExtractor={(item, index) => item.id}
        />
    );
}

export default TodoList

const styles = StyleSheet.create({
    container: {
        // height: '100%', maxHeight: '100%',
        height: 500,
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        overflow: 'scroll',
    },
    text: {
        color: 'black',
        width: '100%',
    }
});
