export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null,
    ) {}

    get isCompleted() {
        return !!this.completedAt;
    }

    public static fromObject(object: {id:number, text: string, completedAt: Date | null}): TodoEntity {
        const { completedAt, id, text } = object;

        if(!id) throw 'Id is required';
        if(!text) throw 'Text is required';

        let newCompletedAt;

        if( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if ( isNaN( newCompletedAt.getTime() ) ) {
                throw 'CompletedAt is not a valid date';
            };
        };

        const newTodo = new TodoEntity(id, text, completedAt);
        return newTodo;
    }
}