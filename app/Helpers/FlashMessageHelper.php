<?php

if(!function_exists('flashMessage')){
    function flashMessage($type = 'success', $message){
       session()->flash('message', $message);
       session()->flash('type', $type);
    }
}
