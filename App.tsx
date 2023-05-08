import React, {useEffect, useState} from "react";
import {StyleSheet, Text, SafeAreaView} from "react-native";
import Menu from "./components/Menu";
import TodoList from "./components/Todo-list";
import ITodo from "./models/Itodo.model";
import EditTodoView from "./views/EditTodo.view";
import axios from "axios";
//import CookieManager from '@react-native-cookies/cookies';

export default function App() {

    const [data, setData] = useState<ITodo[]>([]);
    const [isEditTodoVisible, setIsEditTodoVisible] = useState(false);

    useEffect(() => {
        axios.post("https://e74a-2a02-2788-644-25d-fc65-f6c6-7aee-e851.ngrok-free.app/Auth/login", {
            email: "test@test.com",
            password: "Password"
        }, {
            headers: {
                "Accept": "text/plain",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            //CookieManager.set('JWT', res.data.token);
        }).catch((err) => {
                console.log(err);
            }
        );
    }, []);

    const onAddTodo = () => {
        setIsEditTodoVisible(true);
    };

    const onCloseEditTodo = () => {
        setIsEditTodoVisible(false);
    };

    const onSaveTodo = (d: ITodo) => {
        console.log(d);
        setData((data) => [...data, d]);
        setIsEditTodoVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>ToDo</Text>
            <TodoList data={data}/>
            <Menu onAddTodo={onAddTodo}/>

            <EditTodoView isVisible={isEditTodoVisible}
                          onClose={onCloseEditTodo}
                          onSave={onSaveTodo}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        height: "90%",
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        padding: 20,
        paddingBottom: 0,
    },
});
