const Status = {
    BACKLOG: 'backlog',
    PROCESSING: 'processing',
    DONE: 'done',
    TRASH: 'trash',
};


const StatusLabel = {
    [Status.BACKLOG]: "Бэклог",
    [Status.PROCESSING]: "B прoцессе",
    [Status.DONE]: "Готово",
    [Status.TRASH]: "Kорзина",
};

export {Status, StatusLabel};