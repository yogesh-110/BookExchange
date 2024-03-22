#!/bin/bash
clear
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Welcome to the project!"
echo "What can I do for you today:"
echo "Menu"
echo "Say Hello (1)"
echo "Run Project (2)"
echo "New Env file (3):"
echo "Terminate (4):"
read userChoice

case $userChoice in
    1)
        echo "Good morning!"
        "$script_dir/scripts/get_name.sh"
        ;;
    2)
        npm start
        ;;
    3)
        clear
        "$script_dir/scripts/env_changer.sh"
        if [ $? -eq 0 ]; then
            echo "env_changer.sh completed successfully"
        else
            echo "Error running env_changer.sh"
        fi
        ;;
    4)
        clear
        echo "Have a nice day!"
        exit
        ;;
    *)
        echo "Invalid input, quitting."
        exit
        ;;
esac
