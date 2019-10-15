import React, { Component } from 'react';
import { Button, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';


export default class App extends Component {
  state = {
    messages: [],
    disable: true
  };
  

  componentWillMount() {
    this.setState({ messages:  [
      {
        _id: Math.round(Math.random() * 1000000),
        text: '#awesome',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        image: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
        sent: true,
        received: true,
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Send me a picture!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Where are you?',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'John',
          avatar: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg'
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Yes, and I use Gifted Chat!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        sent: true,
        received: true
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Are you building a chat app?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: "You are officially rocking GiftedChat.",
        createdAt: new Date(),
        system: true,
      },
    ]});
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled style={commonStyles.container}>
        <Header action="talktous" title="Talk To Us" />
{/* 
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderInputToolbar={this.state.disable ? () => null : undefined}
          user={{
            _id: 1,
          }}
        />

      <Button onPress={()=>{this.state.messages.unshift( {
        _id: Math.round(Math.random() * 1000000),
        text: this.state.text,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
       
      })}} title='Eugene' />

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      /> */}

     </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    padding:2,
    margin:2,
    backgroundColor:'#999'
  }
})