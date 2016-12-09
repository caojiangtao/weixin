function List(){
    this.pos= 0;
    this.dataStore=[];
    this.clear = clear;
    this.find = find;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.setdata = setdata;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.hasPrev = hasPrev;
    this.hasNext = hasNext;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
}

function setdata (data){
    this.dataStore = data;  
}
function clear(){
    delete this.dataStore;
    this.dataStore.length =0;
    this.listSize =0;
};

function find(element){
    for(var i =0;i<this.length();++i){
        if(this.dataStore[i] == element){
            return i
        }
    }
     return -1;
};

function length(){
    var len =  this.dataStore.length;
    return len;
};
function append(element){
    var len = this.length();
    this.dataStore[len]= element;    
};
function remove (element){
    var foundAt = this.find(element);
    if(foundAt > -1){
        this.dataStore.splice(foundAt,1);
        return true;
    }
    return false;
};
function front(){
    this.pos = 0;
};
function end(){
    if(this.length()>=1){
      this.pos = this.length()-1;
    }else{
     this.pos = 0;
    }   
};
function prev(){
    --this.pos;
};
function next(){
    if(this.pos < this.length()){
        ++this.pos;
    }
};
function currPos(){
    return this.pos;
};
function getElement(){
    return this.dataStore[this.pos]
};
function hasNext(){
    return this.pos<this.length();
}
function hasPrev(){
    return this.pos>=0;
}


module.exports = List;