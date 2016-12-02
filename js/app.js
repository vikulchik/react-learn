const myNews = [
    {
        author: 'Саша Печкин',
        text: 'Главное отличие неконтролируемого компонента от контролируемого в том, что у него нет обработчика изменений, а значит нет постоянных вызовов setState и перерисовок.'
    },
    {
        author: 'Саша',
        text: 'Для вызова setState, будем использовать событие onChange. Работа с ним не отличается от работы с onClick или другими любыми событиями.'
    },
    {
        author: 'Василий',
        text: 'setState() - не изменяет this.state немедленно, а создает очередь изменений состояния.'
    },
    {
        author: 'Василий',
        text: 'setState() - не изменяет this.state немедленно, а создает очередь изменений состояния.'
    }
];

window.ee = new EventEmitter();

class Article extends React.Component {
    render() {
        const author = this.props.data.author;
        const text = this.props.data.text;
        return(
            <div className="article">
                <p className="news-author">{author}:</p>
                <p className="news-text">{text}</p>
            </div>
        )
    }

}

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        }
    }
    componentDidMount() {
    ReactDOM.findDOMNode(this.refs.author).focus();
};
    sendMyNews = (e) => {
     e.preventDefault();
        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let text = ReactDOM.findDOMNode(this.refs.text).value;

        const item = [
            {
                author: author,
                text: text
            }
        ];
        window.ee.emit('News.add', item);
    };
    onChecked = (e) => {
          e.preventDefault();
          this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    };
    onAuthorChange = (e) => {
        if (e.target.value.trim().length > 0 ) {
            this.setState({authorIsEmpty: false})
        }else  {
            this.setState({authorIsEmpty: true})
        }
    };
    onTextChange = (e) => {
        if (e.target.value.trim().length > 0 ) {
            this.setState({textIsEmpty: false})
        }else  {
            this.setState({textIsEmpty: true})
        }
    };
    render() {
        let agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className="send-news">
                <input
                    className="add-author"
                    placeholder="Имя"
                    defaultValue=""
                    ref="author"
                    onChange={this.onAuthorChange}
                />
                <textarea
                className="add-text"
                ref="text"
                placeholder="Новость"
                defaultValue=""
                onChange={this.onTextChange}>
                </textarea>
                <label className="add-label"> Я согласен с правилами
                    <input className="add-check" type="checkbox" ref="checkrule" onChange={this.onChecked}/>
                </label>
                <button onClick={this.sendMyNews} ref="alert_button" disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>Добавить новость</button>
            </form>
        )
    }
}

class News extends React.Component {
    render() {
        const data = this.props.data;
        let newsTemplate;
        if (data.length){
            newsTemplate= data.map((item, index) => {
                return (
                    <div key={index} className="news-block">
                        <Article data={item}/>
                    </div>
                )
            });
        } else {
            newsTemplate = <p className="news-no">К сожалению новостей нету</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong>Всего новостей: {data.length}</strong>
            </div>
        )
    }
}

class App extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
           news: myNews
        }
    }
    componentDidMount() {
        const self = this;
        window.ee.addListener('News.add', (item) => {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        })
    }
    componentWillUnmount() {
        window.ee.removeListener('News.add');
    }
    render() {
        return (
            <div className="app">
                <h1>Обновление новостей</h1>
                <Add/>
                <News data={this.state.news}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

