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

class Article extends React.Component {
    render() {
        const author = this.props.data.author;
        const text = this.props.data.text;
        const bigText = this.props.data.bigText;

        return(
            <div className="article">
                <p className="news-author">{author}:</p>
                <p className="news-text">{text}</p>
            </div>
        )
    }

}

class InputShow extends React.Component {
    sendMyNews = (e) => {
      alert(ReactDOM.findDOMNode(this.refs.myInput).value);
    };
    render() {
        return (
            <div className="send-news">
                <input
                    className="input"
                    placeholder="Пиши здесь"
                    defaultValue=""
                    ref="myInput"
                />
                <button onClick={this.sendMyNews} ref="alert_button">Отправить</button>
            </div>
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
    render() {
        return (
            <div className="app">
                <h1>Обновление новостей</h1>
                <InputShow/>
                <News data={myNews}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);

