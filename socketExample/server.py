import eventlet
import socketio
import json
f = open("./row1.json")
json_data = json.load(f)
# print(json_data)

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

'''
sio.emit()은 첫 번째 인수로 이벤트 명을 지정하고, 두 번째 인수로 전달할 객체를 지정한다.

sio.event와 sio.on은 동일한 역할을 수행한다.
단, sio.event는 @ 밑에 정의한 함수의 이름을 이벤트 명으로 사용하고, ex) connect, disconnect
sio.on은 인자로 받은 문자를 이벤트 명으로 사용한다. ex) Start-Message
sio.event와 sio.on은 수신하는 이벤트 중, 설정한 이벤트명의 이벤트가 오면, 함수를 수행한다.

예를 들어, sio.emit('Return-Message', json_data)는 
client에 "Return-Message"라는 이름의 이벤트를 json_data와 같이 전달한다.

그럼 client에서는 다음과 같이 on 또는 event를 사용해서 이벤트를 받아 처리할 수 있다.
@sio.on("Return-Message")
def returnMessage(sid, data):
    print('message :', data)

####################################################################

@sio.event
def connect(sid, environ):
    print('connect ', sid)
@sio.event
def disconnect(sid):
    print('disconnect ', sid)

이 둘은 socket을 연결하고 끊는 역할을 한다.

@sio.on("Start-Message")
def startMessage(sid, data):
    print('message :', data)
    sio.emit('Return-Message', json_data)

client와 메세지를 주고 받는 함수이다.
client에서 "Start-Message"라는 이름의 이벤트를 emit하면, server에서 json_data를 전달한다.
'''

@sio.event
def connect(sid, environ):
    print('connect ', sid)

@sio.on("Start-Message")
def startMessage(sid, data):
    print('message :', data)
    sio.emit('Return-Message', json_data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 65400)), app)