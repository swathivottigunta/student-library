import React from 'react';
import { Container, Draggable } from "react-smooth-dnd";
import Student from '../utils/Student'
import '../Change-Status.css';



const columnNames = ['active', 'delinquent', 'dropped'];
let childItems;
const cardColor = 'beige'

// Generate Items

const generateSceneItems = () => {
    let scene = {}
    scene.type = "container";
    scene.props = { orientation: "horizontal" }
    scene.children = generateColumnItems()
    return scene;
}
const generateColumnItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < columnNames.length; i++) {
        let column = {};
        column.type = "container";
        column.id = `column${i}`
        column.name = columnNames[i]
        column.props = {
            orientation: "vertical",
            className: "card-container"
        }
        column.children = generateChildItems(i);
        result.push(column)
    }
    return result;
};
const generateChildItems = (column) => {

    let items = childItems.students[column];
    let result = []
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let item = {};
            item = items[i]
            item.type = "draggable";
            item.props = { className: 'card', style: { backgroundColor: cardColor } }
            result.push(item)
        }
    }
    return result
};
const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

class StudentChangeStatus extends React.Component {
    constructor() {
        super();

        this.onCardDrop = this.onCardDrop.bind(this);
        this.getCardPayload = this.getCardPayload.bind(this);
        this.state = {
            scene: null,
            message: ''
        }
    }

    componentDidMount() {
        this._asyncRequest = Student.getAllStudentsByStatus().then(students => {
            if (students) {
                childItems = students
                this.setState({ scene: generateSceneItems() })
            }
            else {
                this._asyncRequest = null;
                this.setState({
                    message: 'Something went wrong. Try again!!'
                });
            }
        });
    }
    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    render() {
        let containerItems;

        if (this.state.scene !== null) {
            containerItems = this.state.scene.children.map(column => {
                return (

                    <div key={column.id}>

                        <div className={column.props.className}>
                            <div className="card-column-header">
                                <span className="column-drag-handle">Status: </span>
                                {column.name}
                            </div>
                            <Container
                                {...column.props}
                                groupName="col"
                                onDrop={e => this.onCardDrop(column.id, e)}
                                getChildPayload={index =>
                                    this.getCardPayload(column.id, index)
                                }
                                dragClass="card-ghost"
                                dropClass="card-ghost-drop"
                                dropPlaceholder={{
                                    animationDuration: 150,
                                    showOnTop: true,
                                    className: 'drop-preview'
                                }}
                                dropPlaceholderAnimationDuration={200}
                            >
                                {column.children.map(card => {
                                    return (
                                        <Draggable key={card.id}>
                                            <div {...card.props}>
                                                <div>
                                                    <p>Id: {card.id}</p><p>{card.firstName} {card.lastName}</p><p>{card.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </Draggable>
                                    );
                                })}
                            </Container>
                        </div>
                    </div>
                );
            })
        }
        else {
            containerItems = ''
        }
        return (

            <div className="card-scene">
                <div className="result">{this.state.message}</div>
                <Container
                    orientation="horizontal"
                    dragHandleSelector=".column-drag-handle"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'cards-drop-preview'
                    }}
                >
                    {
                        containerItems
                    }
                </Container>
            </div>
        );
    }

    getCardPayload(columnId, index) {
        console.log(columnId, index)
        this.setState({
            message: ''
        });
        return this.state.scene.children.filter(p => p.id === columnId)[0].children[
            index
        ];
    }

    onCardDrop(columnId, dropResult) {

        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const scene = Object.assign({}, this.state.scene);
            const column = scene.children.filter(p => p.id === columnId)[0];
            const columnIndex = scene.children.indexOf(column);

            const newColumn = Object.assign({}, column);
            newColumn.children = applyDrag(newColumn.children, dropResult);
            scene.children.splice(columnIndex, 1, newColumn);

            this.setState({
                scene
            });
        }
        if (dropResult.addedIndex !== null) {
            let studentId = dropResult.payload.id

            let studentStatus = columnId
            studentStatus = columnNames[studentStatus.replace('column', '')]
            if (dropResult.payload.status !== studentStatus) {
                let student = { id: studentId, status: studentStatus }
                this.setState({
                    message: 'Updating...'
                });
                Student.updateStudentByStatus(student).then(student => {
                    if (student) {
                        this.setState({
                            message: 'Updated Status Successfully'
                        });
                    }
                    else {
                        this.setState({
                            message: 'Something went wrong. Try again!!',
                            scene: generateSceneItems()
                        });
                    }
                });
            }

        }
    }
}
export default StudentChangeStatus;