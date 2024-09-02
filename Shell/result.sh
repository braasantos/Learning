#!/bin/bash
# if [ "$#" -ne 1 ]; then
#     echo "Usage: $0 <path>"
#     exit 1
# fi
# correct_path="/home/bjorge-m/Learning/Shell/a"

# if [ "$correct_path" = "$1" ];then
#     echo "corect path"
# else
#     echo "incorrect path"
# fi

# if [ ! -f "$1" ]; then
#     echo "File not found or not readable: $1"
#     exit 2
# fi

# while IFS= read -r line; do
#     if [[ "$line" == *"ola"* ]];then
#         echo "equal line"
#     else
#         echo "not equal line"
#     fi
# done < "$1"

# !/bin/bash

# Variables

# SOURCE_DIR="$HOME/Learning/Shell"   # Directory you want to back up
# BACKUP_DIR="$HOME/backup"       # Directory where backups will be stored
# DATE=$(date +"%Y-%m-%d_%H-%M-%S")  # Current date and time for backup folder name
# BACKUP_NAME="my_project_backup_$DATE"
# DEST_DIR="$BACKUP_DIR/$BACKUP_NAME"

# # Create backup directory if it doesn't exist
# if [ ! -d "$BACKUP_DIR" ]; then
#     mkdir -p "$BACKUP_DIR"
#     echo "Created backup directory: $BACKUP_DIR"
# fi

# # Copy the source directory to the backup location
# cp -r "$SOURCE_DIR" "$DEST_DIR"

# # Check if the backup was successful
# if [ $? -eq 0 ]; then
#     echo "Backup completed successfully!"
#     echo "Backup stored in: $DEST_DIR"
# else
#     echo "Backup failed!"
# fi

#!/bin/bash

# Check if a letter was provided
#!/bin/bash

# Check if a letter was provided
cd $HOME

if [ -z "$1" ]; then
    echo "Usage: $0 <letter>"
    exit 1
fi

LETTER=$1

# Check if the provided argument is a single letter
if [[ ! "$LETTER" =~ ^[a-zA-Z]$ ]]; then
    echo "Error: Please provide a single letter."
    exit 1
fi

# Confirm deletion
read -p "Are you sure you want to delete all directories starting with '$LETTER'? [y/N] " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 0
fi

# Find and delete directories that start with the specified letter
found=0
for dir in "$LETTER"*; do
    if [ -d "$dir" ]; then
        echo "Deleting directory: $dir"
        rm -rf "$dir"
        found=1
    fi
done

if [ $found -eq 0 ]; then
    echo "No directories starting with '$LETTER' found."
else
    echo "Deletion complete."
fi
