export const cells = {
    empty : {
        class: 'empty',
        id: 0,
    },
    wall : {
        class: 'wall',
        id: 1,
    },
    start: {
        class: 'start',
        id: 2,
    },
    end : {
        class: 'end',
        id: 3,
    },
    current: {
        class: 'current',
        id: 4,
    },
    visited: {
        class: 'visited',
        id: 5,
    },
    path: {
        class: 'path',
        id: 6,
    },

    findCellById(id: number): any {
        for(let key in this) {
            if((this as any)[key].id === id  && typeof (this as any)[key] !== 'function') {
                return  (this as any)[key];
            }
        }
    
    }

}
