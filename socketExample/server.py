import socket
import pandas as pd
from pandas import DataFrame
import json

csv_file = pd.read_csv("C:/Users/kshw1/OneDrive/바탕 화면/프로젝트들/OCDC-BMS/socketExample/Merged file.csv",sep = ";", encoding= 'unicode_escape')

f = open("C:/Users/kshw1/OneDrive/바탕 화면/프로젝트들/OCDC-BMS/socketExample/row1.json")
json_data = json.load(f)
print(json_data)

def start_server():
    host = '0.0.0.0'  # Listen on all available interfaces
    port = 65400      # Port to listen on

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        s.listen()
        print(f"Server is listening on {host}:{port}")

        conn, addr = s.accept()
        with conn:
            print('Connected by', addr)
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                print(f"Received: {data.decode()}")
                conn.sendall(json_data)  # Echo back the same data

if __name__ == "__main__":
    start_server()
