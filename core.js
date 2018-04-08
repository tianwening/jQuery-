(function(w){
    var version = "1.0.1";
    //首先定义一个jQuery的工厂函数
    function jQuery(selector){
        return new jQuery.fn.init(selector);
    }
    jQuery.fn = jQuery.prototype = {
        jquery : version,
        constructor : jQuery,
        length : 0,
        selector : "",
        toArray : function(){
            return [].slice.apply(this);
        },
        get : function(i){
            if(arguments.length === 0){
                return this.toArray();
            }
            if(i>=0){
                return this[i];
            }else{
                return this[this.length+i];
            }
        },
        each : function(fn){
            return jQuery.each(this,fn);
        },
        map : function(fn){
            return jQuery.map(this,fn);
        },
        slice : function(){
            return jQuery([].slice.apply(this,arguments));
        },
        eq : function(i){
            if(i==null){
                return jQuery();
            }
            return jQuery(this.get(i));
        },
        first : function(){
            return this.eq(0);
        },
        last : function(){
            return this.eq(-1);
        },
        push : [].push,
        sort : [].sort,
        splice : [].splice
    }
    jQuery.extend = jQuery.fn.extend = function(obj){
        for(var key in obj){
            this[key] = obj[key];
        }
    }
    jQuery.extend({
        each : function(obj,fn){
            var i, len, key;
            if(jQuery.isLikeArray(obj)){
                for(i=0,len=obj.length;i<len;i++){
                    if(fn.call(obj[i],i,obj[i])===false){
                        break;
                    }
                }
            }else{
                for(key in obj){
                    if(fn.call(obj[key],i,obj[key])===false){
                        break;
                    }
                }
            }
            return obj;
        },
        map : function(obj,fn){
            var i, len, key, result = [];
            if(jQuery.isLikeArray(obj)){
                for(i=0,len=obj.length;i<len;i++){
                    result.push(fn.call(obj[i],obj[i],i));
                }
            }else{
                for(key in obj){
                    result.push(fn.call(obj[key],obj[key],key));
                }
            }
            return result;
        },
        trim : function(str){
            if(!str){
                return str;
            }
            if(str.trim){
                return str.trim();
            }
            return str.replace(/^+\s|\s+$/g,"");
        },
        isFunction : function(fn){
            return typeof fn === 'function';
        },
        isWindow : function(w){
            return w.window === w;
        },
        isObject : function(obj){
            if(!obj){
                return false;
            }
            return typeof obj === 'object'||typeof obj === 'function';
        },
        isString : function(str){
            return !!str&&typeof str === 'string';
        },
        isHTML :function(html){
            if(!html){
                return false;
            }
            if(html.charAt(0)==="<"&&html.charAt(html.length-1)===">"&&html.length>=3){
                return true;
            }
            return false;
        },
        isLikeArray : function(arr){
            if(!arr){
                return false;
            }
            if(Array.isArray(arr)||({}).toString.call(arr) === "object Array"){
                return true;
            }
            if("length" in arr&&(arr.length===0||arr.length-1 in arr)){
                return true;
            }
            return false;
        },
        ready : function(fn){
            if(document.readyState === 'complete'){
                fn();
            }
            else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",fn);
            }
            else{
                document.attachEvent("onreadystatechange", function(){
                    if(document.readyState === "complete"){
                        fn();
                    }
                })
            }
        }
    })
    var init = jQuery.fn.init = function(selector){
        if(!selector){
            return this;
        }else if(jQuery.isFunction(selector)){
            jQuery.ready(selector);
        }else if(jQuery.isString(selector)){
            selector = jQuery.trim(selector);
            if(jQuery.isHTML(selector)){
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = selector;
                [].push.apply(this,tempDiv.childNodes);
            }else{
                [].push.apply(this,document.querySelectorAll(selector));
            }
        }else if(jQuery.isLikeArray(selector)){
            [].push.apply(this,selector);
        }else{
           this[0] = selector;
           this.length = 1;
        }
    }
    init.prototype = jQuery.fn;
    w.jQuery = w.$ =jQuery;
}(window))