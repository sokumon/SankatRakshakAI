import asyncio
import websockets
# create handler for each connection
language_code = ""
async def handler(websocket, path):
    while True:
        data = await websocket.recv()
        if data == 'hi':
            print(data)
            soundfile = open('mastercta.wav','rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            await websocket.send(sound)
        elif data =='start':
            print(data)
        elif data == '1':
            language_code = "en-US"
            print(type(data))
            english = open('english.wav','rb')
            engsound = english.read()
            print("hi")
            reply = f"Data recieved as:  {data}!"
            await websocket.send(engsound)
        elif data == '2':
            language_code = "hi-IN"
            soundfile = open('hindi.wav','rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            await websocket.send(sound)
        elif data == '3':
            language_code = "mr-IN"
            soundfile = open('marathi.wav','rb')
            sound = soundfile.read()
            reply = f"Data recieved as:  {data}!"
            await websocket.send(sound)
        else:
            print(data)
            wavfile = file("out.wav","wb")
            wavfile.write(data)
start_server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()