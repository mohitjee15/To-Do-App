(function(){
    window.app =   (function(config){
        //define variable
        var remainingTasksListId;
        var doneTasksListId;
        var newTaskFormId;
        var newTaskInputName;
        var noRemainingTaskId;
        var noDoneTaskId;

        var remainingTasksElement;
        var doneTasksElement;
        var newTaskFormElement;

        //Setter methods for private variables
        var setRemainingTasksListId	=	function(remainingTasksListIdPar){
            remainingTasksListId = remainingTasksListIdPar;
        };

        var setDoneTasksListId	=	function(doneTasksListIdPar){
            doneTasksListId = doneTasksListIdPar;
        };

        var setNewTaskFormId    =	function(newTaskFormIdPar){
            newTaskFormId = newTaskFormIdPar;
        };

        var setNewTaskInputName =   function(newTaskInputNamePar){
            newTaskInputName    =   newTaskInputNamePar;
        };

        var setNoRemainingTaskId	=	function(noRemainingTaskIdPar){
            noRemainingTaskId = noRemainingTaskIdPar;
        };

        var setNoDoneTaskId	=	function(noDoneTaskIdPar){
            noDoneTaskId = noDoneTaskIdPar;
        };

        //Set javascript instances for remaining tasks, done tasks and new task form
        var createElementsInstance =   function(){
            remainingTasksElement   =   document.getElementById(remainingTasksListId);
            doneTasksElement    =   document.getElementById(doneTasksListId);
            newTaskFormElement  =   document.getElementById(newTaskFormId);

        };

        //Adding a task to remaining task list
        var createRemainingTaskLi   =   function(taskDescription){
            var newRemainingTask    =    document.createElement('li');
            newRemainingTask.tabIndex   =   3;
            newRemainingTask.innerHTML  =   '<input tabindex="-1" type="checkbox"/><label>'+taskDescription+'</label><span class="remove">x</span>';
            remainingTasksElement.appendChild(newRemainingTask);
            newRemainingTask.addEventListener('keydown',function(event){
                listFunctions(event,this);
            });
            newRemainingTask.childNodes[0].addEventListener('change',function(){
                toggleStatus(this);
            });
            newRemainingTask.childNodes[2].addEventListener('click',function(e){
                e.preventDefault();
                console.log(this.parentNode.parentNode);
                this.parentNode.parentNode.removeChild(newRemainingTask);
                putNoRemainingTaskHTML();
                putNoDoneTaskHTML();
            });
        };

        //If there are no tasks in the remaining tasks list then display no remaining results
        var putNoRemainingTaskHTML  =   function(){
            if(remainingTasksElement.innerHTML == ''){
                remainingTasksElement.innerHTML = '<li>'+
                    '<label id="no-remaining">'+
                    '<span>No remaining task</span>'+
                    '</label>'+
                    '</li>';
            }
        };

        //If there are no tasks in the done tasks list then display no results
        var putNoDoneTaskHTML  =   function(){
            if(doneTasksElement.innerHTML == ''){
                doneTasksElement.innerHTML = '<li>'+
                    '<label id="no-done">'+
                    '<span>No task done</span>'+
                    '</label>'+
                    '</li>';
            }
        };

        //binding the form submit listener to the form
        var bindFormToSubmitListner  =   function(){
            newTaskFormElement.addEventListener('submit',function(e){
                e.preventDefault();
                if(document.getElementById(noRemainingTaskId)){
                    remainingTasksElement.innerHTML =   '';
                }
                createRemainingTaskLi(this[newTaskInputName].value);
            });

        };

        //functions to be performed when a key is pressed while focus is on a task
        var listFunctions   =   function(event,taskLi){
            var siblingsAndItself    =   taskLi.parentNode.childNodes;
            for(var i in  siblingsAndItself){
                if(siblingsAndItself.propertyIsEnumerable(i) && (siblingsAndItself[i] ==  taskLi) ){
                    i   = parseInt(i);
                    var previousLi  =   siblingsAndItself[i-1]  ?   siblingsAndItself[i-1]  :   false;
                    var nextLi  =   siblingsAndItself[i+1]  ?   siblingsAndItself[i+1]  :   false;
                    break;
                }
            }

            var keycode =   event.keyCode;
            var checkbox    =   taskLi.childNodes[0];

            if((keycode == 38) && (previousLi)){ //up key
                previousLi.focus();
            } else if((keycode == 40) && (nextLi)){ //down key
                nextLi.focus();
            } else if(keycode == 46) { //delete key
                taskLi.parentNode.removeChild(taskLi);
                putNoRemainingTaskHTML();
                putNoDoneTaskHTML();
                if(previousLi){
                    previousLi.focus();
                } else if(nextLi){
                    nextLi.focus();
                }
            } else if(keycode   ==  13) { //enter key
                checkbox.checked    =   !checkbox.checked;
                toggleStatus(checkbox);
                if(previousLi){
                    previousLi.focus();
                } else if(nextLi){
                    nextLi.focus();
                }
            } else if((keycode   ==  37) && checkbox.checked && (document.getElementById(noRemainingTaskId) == null)){ //left key
                remainingTasksElement.childNodes[0].focus();
            } else if((keycode   ==  39) && !checkbox.checked && (document.getElementById(noDoneTaskId) == null)){ //right key
                doneTasksElement.childNodes[0].focus();
            }
        };

        //Toggle status of a task
        var toggleStatus  =   function(taskCheckbox){

            var taskLi  =   taskCheckbox.parentNode;
            if(taskCheckbox.checked){
                if(document.getElementById(noDoneTaskId)){
                    doneTasksElement.innerHTML =   '';
                }
                remainingTasksElement.removeChild(taskLi);
                doneTasksElement.appendChild(taskLi);
                putNoRemainingTaskHTML();

            } else {
                if(document.getElementById(noRemainingTaskId)){
                    remainingTasksElement.innerHTML =   '';
                }
                doneTasksElement.removeChild(taskLi);
                remainingTasksElement.appendChild(taskLi);
                putNoDoneTaskHTML();

            }


        };

        //Return the an object containing all the functions that are exposed
        return {
            setRemainingTasksListId : setRemainingTasksListId,
            setDoneTasksListId : setDoneTasksListId,
            setNewTaskFormId : setNewTaskFormId,
            setNewTaskInputName :   setNewTaskInputName,
            createElementsInstance : createElementsInstance,
            bindFormToSubmitListner    :   bindFormToSubmitListner,
            setNoRemainingTaskId    :   setNoRemainingTaskId,
            setNoDoneTaskId :   setNoDoneTaskId

        };

    })();
})();
