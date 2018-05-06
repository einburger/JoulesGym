import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    TextInput,
    FlatList
} from 'react-native';

export default class ExerciseSelectionScreen extends Component {

    state = {
        text: '',
        all_data: [
            { path: require('../assets/arnold_curl.gif'), name: 'Arnold Curl', key: '0' },
            { path: require('../assets/dumbell_military_press.gif'), name: 'Military Press', key: '1' },
            { path: require('../assets/skullcrushers.gif'), name: 'Skull Crushers', key: '2' },
            { path: require('../assets/bench_press.gif'), name: 'Bench Press', key: '3' },
        ],
        data: [
            { path: require('../assets/arnold_curl.gif'), name: 'Arnold Curl', key: '0' },
            { path: require('../assets/dumbell_military_press.gif'), name: 'Military Press', key: '1' },
            { path: require('../assets/skullcrushers.gif'), name: 'Skull Crushers', key: '2' },
            { path: require('../assets/bench_press.gif'), name: 'Bench Press', key: '3' },
        ]
    };

    onPress = () => {
        this.props.navigation.navigate('Record')
    }

    scanData = () => {
        var workouts = this.state.data;
        var new_data = [];
        for (var i = 0; i < workouts.length; i++) {
            if (workouts[i].name.includes(this.state.text))
            {
                new_data.push(workouts[i]);
            }
        }
        return new_data;
    }

    onSearch = () => {
        var new_data = this.scanData(); 
        if (this.state.text != '' && new_data.length > 0) {
            this.setState(previousState => {
                return { data: new_data }
            });
        } else {
            this.setState(previousState => {
                return { data: this.state.all_data }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder='Search For Exercise'
                    onChangeText={ (text) => this.setState({text}, () => { this.onSearch() }) }
                    //onSubmitEditing={ this.onSearch() }
                    value={this.state.text}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) =>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this.onPress}>
                                <View style={styles.gif}>
                                    <Image source={item.path} />
                                    <Text fontSize='30'> {item.name} </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#859a9b',
    },
    gif: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    searchBar: {
        textAlign: 'center',
        height: 40,
        borderColor: '#74999e',
        backgroundColor: '#FFFFFF',
    }
});

// const Header = (props) => (
//     <View style={styles.container}>

//     </View>

// };

// skip this line if using Create React Native App
AppRegistry.registerComponent('JoulesGym', () => ExerciseSelectionScreen);