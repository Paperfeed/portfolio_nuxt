for filename in os.listdir(target):
    os.rename(filename, datetime.fromtimestamp(
                         os.path.getmtime(filename)).strftime(
                          '{0}-%Y-%m-%d-%H:%M:%S.jpeg'.format(prefix)))
